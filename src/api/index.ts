import { EmployeeType } from "../types/employees";

const TOKEN = "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";
const GIST_ID = "43df1d70eab985ccd41cd877f2bc8081";
const GIST_FILENAME = "db.json";

export const getData = async () => {
  const req = await fetch(`https://api.github.com/gists/${GIST_ID}`);
  const gist = await req.json();
  return JSON.parse(gist.files[GIST_FILENAME].content);
};

export const setData = async (data: Array<EmployeeType>) => {
  const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      files: {
        [GIST_FILENAME]: {
          content: JSON.stringify(data),
        },
      },
    }),
  });

  return req.status;
};
