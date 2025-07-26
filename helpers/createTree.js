let count = 0;
function createTree(records, parentId = "") {
  let tree = [];
    records.forEach(record => {
      if (record.parent_id === parentId) {
        count++;
        const newRecord = record
        newRecord.index = count; // Assign index based on the current count
        const children = createTree(records, record.id);
        if (children.length > 0) {
          newRecord.children = children;
        }
        tree.push(newRecord);
      }
    });
    return tree;
}

module.exports = (records, parentId = "") => {
    count = 0; // Reset count for each new tree creation
    return createTree(records, parentId);
};