import opine from "https://deno.land/x/opine@2.3.4/mod.ts";

if (import.meta.main) {
  const app = opine();

  app.get("/file", async function (req, res, next) {
    try {
      await res.download("files/Документ.txt");
    } catch (err) {
      // file for download not found
      if (err instanceof Deno.errors.NotFound) {
        res.status = 404;
        res.send("Cant find that file, sorry!");

        return;
      }

      // non-404 error
      return next(err);
    }
    res.attachment("Документ.txt");
    res.send("Admin Secret");
  });

  app.listen({port: 8080});
}