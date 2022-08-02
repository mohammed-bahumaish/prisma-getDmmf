import { useEffect, useState } from "react";

const Home = () => {
  const [schema, setSchema] = useState(`model Post {
    id        Int      @id @default(autoincrement())
    createdAt DateTime @default(now())
    updatedAt DateTime @updatedAt
    title     String
    content   String?
    published Boolean  @default(false)
  }`);
  const [dmmf, setDmmf] = useState("");

  const getDMMF = async (schema: string) => {
    try {
      const result = await fetch("/api/hello", {
        body: JSON.stringify({ schema }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const _dmmf = await result.json();
      setDmmf(JSON.stringify(_dmmf, null, 2));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDMMF(schema);
  }, [schema]);

  return (
    <div>
      <textarea
        rows={4}
        cols={50}
        value={schema}
        onChange={async (e) => {
          setSchema(e.target.value);
        }}
      />
      <pre>{dmmf}</pre>
    </div>
  );
};

export default Home;
