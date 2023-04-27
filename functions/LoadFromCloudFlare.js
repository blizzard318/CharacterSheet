export async function onRequest(context) {
  const kv = context.env.Pathfinder1;
  
  const value = await kv.get("Andrew/1");
  alert(value);
}