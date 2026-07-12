import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);
    const offset = parseInt(searchParams.get("offset") || "0");

    const supabase = getSupabaseAdmin();

    // Get total count
    const { count: total } = await supabase
      .from("questionnaire_responses")
      .select("*", { count: "exact", head: true });

    // Get paginated results
    const { data, error } = await supabase
      .from("questionnaire_responses")
      .select("*")
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch responses" },
        { status: 500 }
      );
    }

    // Filter by search term if provided
    let filtered = data || [];
    if (search) {
      filtered = filtered.filter((r: any) => {
        const info = r.personal_info || {};
        return (
          info.fullName?.toLowerCase().includes(search) ||
          info.phoneNumber?.toLowerCase().includes(search) ||
          info.stateOfBirth?.toLowerCase().includes(search)
        );
      });
    }

    return NextResponse.json({
      responses: filtered,
      total: total || 0,
      limit,
      offset,
    });
  } catch (err) {
    console.error("Admin fetch error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
