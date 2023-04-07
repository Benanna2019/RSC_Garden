export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          role: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          name?: string | null
          role?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          role?: string | null
          username?: string | null
        }
      }
      comments: {
        Row: {
          author_email: string | null
          author_name: string | null
          author_url: string | null
          created_at: string | null
          id: string
          post_id: string | null
          text: string | null
          updated_at: string | null
          viewerCanDelete: boolean | null
          viewerCanEdit: boolean | null
        }
        Insert: {
          author_email?: string | null
          author_name?: string | null
          author_url?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          text?: string | null
          updated_at?: string | null
          viewerCanDelete?: boolean | null
          viewerCanEdit?: boolean | null
        }
        Update: {
          author_email?: string | null
          author_name?: string | null
          author_url?: string | null
          created_at?: string | null
          id?: string
          post_id?: string | null
          text?: string | null
          updated_at?: string | null
          viewerCanDelete?: boolean | null
          viewerCanEdit?: boolean | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
