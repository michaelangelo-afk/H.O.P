import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { personal_info, answers } = body;

    if (!personal_info || !answers) {
      return NextResponse.json(
        { error: "Missing required fields: personal_info and answers" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("questionnaire_responses")
      .insert({
        personal_info,
        answers,
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to save response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data.id }, { status: 201 });
  } catch (err) {
    console.error("Save error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
