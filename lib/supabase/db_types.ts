export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          author_id: string
          content: string
          created_at: string | null
          id: string
          post_id: string
          updated_at: string | null
        }
        Insert: {
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          post_id: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          post_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey"
            columns: ["author_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string
          email: string
          id: string
          name: string
          username: string
        }
        Insert: {
          avatar_url: string
          email: string
          id: string
          name: string
          username: string
        }
        Update: {
          avatar_url?: string
          email?: string
          id?: string
          name?: string
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      views: {
        Row: {
          id: string
          views_count: number
        }
        Insert: {
          id: string
          views_count?: number
        }
        Update: {
          id?: string
          views_count?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_article_view: {
        Args: {
          slug: string
          inc_amt: number
        }
        Returns: undefined
      }
      increment_post_view:
        | {
            Args: {
              slug: string
              inc_amt: number
            }
            Returns: undefined
          }
        | {
            Args: {
              slug: string
              inc_amt: number
            }
            Returns: undefined
          }
      increment_post_views: {
        Args: {
          slug: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
