import z from "zod";

export async function POST(req: Request) {
  //
  const rawBodyData = await req.json();

  const schema = z.object({
    name: z.string(),
    description: z.string(),
  });
  const parsedBodyData = await schema.parseAsync(rawBodyData);

  console.log(parsedBodyData);

  return new Response(
    JSON.stringify(
      {
        name: parsedBodyData.name,
        description: parsedBodyData.description,
      },
      null,
      "\t",
    ),
  );
}
