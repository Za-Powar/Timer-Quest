const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  const table = req.query.table;
  const rowId = req.query.id; // used for update/delete

  if (!table) return res.status(400).json({ message: "Table required" });

  try {
    switch (req.method) {
      case "POST": // Create
        const createData = req.body;
        const { data: created, error: createError } = await supabase
          .from(table)
          .insert(createData);
        if (createError) throw createError;
        return res.status(201).json(created);

      case "GET": // Read
        let query = supabase.from(table).select("*");
        if (rowId) query = query.eq("id", rowId);
        const { data: readData, error: readError } = await query;
        if (readError) throw readError;
        return res.status(200).json(readData);

      case "PUT": // Update
        if (!rowId) return res.status(400).json({ message: "Row id required for update" });
        const updateData = req.body;
        const { data: updated, error: updateError } = await supabase
          .from(table)
          .update(updateData)
          .eq("id", rowId);
        if (updateError) throw updateError;
        return res.status(200).json(updated);

      case "DELETE": // Delete
        if (!rowId) return res.status(400).json({ message: "Row id required for delete" });
        const { data: deleted, error: deleteError } = await supabase
          .from(table)
          .delete()
          .eq("id", rowId);
        if (deleteError) throw deleteError;
        return res.status(200).json(deleted);

      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Supabase error", error: err });
  }
}