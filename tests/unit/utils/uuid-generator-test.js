import {v1, v4, parse, unparse} from 'ember-uuid';
import uuid from 'ember-uuid/utils/uuid-generator';
import { module, test } from 'qunit';

module('Unit | Utility | uuid generator');

const TIME = 1321644961388; // 2011-11-18 11:36:01.388-08:00

test('it generates v4 random UUIDs', function(assert) {
  var result = v4();
  assert.ok((/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/).test(result));
});

test('it generates v1 UUIDs', function(assert) {
  var result = v1();
  assert.ok((/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/).test(result));
});

test('exports', function(assert) {
  assert.equal('function', typeof(parse));
  assert.equal('function', typeof(unparse));
  assert.equal('function', typeof(v1));
  assert.equal('function', typeof(v4));
  assert.equal('function', typeof(uuid.v4));
  assert.equal('function', typeof(uuid.v1));
  assert.equal('function', typeof(uuid.parse));
  assert.equal('function', typeof(uuid.unparse));
});

test('parse/unparse', function(assert) {
  var id = '00112233445566778899aabbccddeeff';
  assert.equal(unparse(parse(id.substr(0,10))),
    '00112233-4400-0000-0000-000000000000', 'Short parse');
  assert.equal(unparse(parse('(this is the uuid -> ' + id + id)),
    '00112233-4455-6677-8899-aabbccddeeff', 'Dirty parse');
});

test('clock regression by msec', function(assert) {
  // Verify clock regression bumps clockseq
  var uidt = v1({msecs: TIME});
  var uidtb = v1({msecs: TIME - 1});
  assert.equal(
    parseInt(uidtb.split('-')[3], 16) - parseInt(uidt.split('-')[3], 16), 1,
    'Clock regression by msec increments the clockseq'
  );
});

test('clock regression by nsec', function(assert) {
  // Verify clock regression bumps clockseq
  var uidtn = v1({msecs: TIME, nsecs: 10});
  var uidtnb = v1({msecs: TIME, nsecs: 9});
  assert.equal(
    parseInt(uidtnb.split('-')[3], 16) - parseInt(uidtn.split('-')[3], 16), 1,
    'Clock regression by nsec increments the clockseq'
  );
});

test('explicit options product expected id', function(assert) {
  // Verify explicit options produce expected id
  var id = v1({
    msecs: 1321651533573,
    nsecs: 5432,
    clockseq: 0x385c,
    node: [ 0x61, 0xcd, 0x3c, 0xbb, 0x32, 0x10 ]
  });
  assert.equal(id, 'd9428888-122b-11e1-b85c-61cd3cbb3210', 'Explicit options produce expected id');
});

test('ids spanning 1ms boundary are 100ns apart', function(assert) {
  // Verify adjacent ids across a msec boundary are 1 time unit apart
  var u0 = v1({msecs: TIME, nsecs: 9999});
  var u1 = v1({msecs: TIME + 1, nsecs: 0});

  var before = u0.split('-')[0], after = u1.split('-')[0];
  var dt = parseInt(after, 16) - parseInt(before, 16);
  assert.equal(dt, 1, 'Ids spanning 1ms boundary are 100ns apart');
});
