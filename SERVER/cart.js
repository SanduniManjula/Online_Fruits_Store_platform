import { writeFileSync } from "fs";

const content = "Some content!";

try {
  writeFileSync("test.txt", content);
  // file written successfully
} catch (err) {
  console.error(err);
}
