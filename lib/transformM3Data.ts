type RecordObject = {
  [key: string]: string;
};

export function transformData(
  inputArray: Array<{ REPL: string }>,
  idColumnName?: string | null
): RecordObject[] {
  if (inputArray.length === 0) {
    return [];
  }

  // Extract column names from the first element
  const columnNames = inputArray[0].REPL.split(";"); //TODO: byta separerare?

  // Find the index of the id column
  const idColumnIndex = columnNames.indexOf(idColumnName ?? "");
  // if (idColumnIndex === -1) {
  //   throw new Error(`Column name "${idColumnName}" not found.`);
  // }

  // Transform the rest of the array
  return inputArray.slice(1).map((item) => {
    const values = item.REPL.split(";");
    const record: RecordObject = {};

    columnNames.forEach((columnName, index) => {
      record[columnName] = values[index];
    });

    // Add the 'id' attribute
    record["id"] = values[idColumnIndex];

    return record;
  });
}
