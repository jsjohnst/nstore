require('./helper');

var documents = nStore('fixtures/new.db');

var thesis = {
  title: "Node is cool",
  author: "creationix",
  reasons: ["Non-Blocking I/O", "Super Fast", "Powered by bacon"]
};

expect("save");
documents.save("thesis", thesis, function (err) {
  fulfill("save");
  if (err) throw err;
  assert.equal(documents.length, 1, "There should be 1 document in the collection");
  expect("get");
  documents.get("thesis", function (err, doc, meta) {
    fulfill("get");
    if (err) throw err;
    assert.deepEqual(doc, thesis, "Loading it back should look the same");
    assert.equal(meta.key, "thesis", "The meta should have the key");
  });

  expect("autokey");
  documents.save(null, thesis, function (err, meta) {
    fulfill("autokey");
    if (err) throw err;
    assert.ok(meta.key, "There should be a generated key");
    assert.equal(documents.length, 2, "There should be 2 documents in the collection");
    expect("get back");
    documents.get(meta.key, function (err, doc, newMeta) {
      fulfill("get back");
      if (err) throw err;
      assert.deepEqual(doc, thesis, "Loading it back should look the same");
      assert.deepEqual(newMeta, meta, "The meta should have the key");
    });

    setTimeout(function () {
      expect("delayed save");
      documents.save("slow", thesis, function (err, meta) {
        fulfill("delayed save");
        if (err) throw err;
        assert.equal(documents.length, 3, "There should be 3 documents in the collection");
      });
    });

  });

});


