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
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string | null
          full_name: string | null
          avatar_url: string | null
          role: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string | null
          full_name?: string | null
          avatar_url?: string | null
          role?: string
        }
      }
      resources: {
        Row: {
          id: string
          created_at: string
          updated_at: string | null
          title: string
          description: string
          category: string
          file_url: string
          file_type: string
          file_size: number
          downloads: number
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string | null
          title: string
          description: string
          category: string
          file_url: string
          file_type: string
          file_size: number
          downloads?: number
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string | null
          title?: string
          description?: string
          category?: string
          file_url?: string
          file_type?: string
          file_size?: number
          downloads?: number
          user_id?: string
        }
      }
      articles: {
        Row: {
          id: string
          created_at: string
          updated_at: string | null
          title: string
          content: string
          excerpt: string
          category: string
          image_url: string
          published: boolean
          author_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string | null
          title: string
          content: string
          excerpt: string
          category: string
          image_url: string
          published?: boolean
          author_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string | null
          title?: string
          content?: string
          excerpt?: string
          category?: string
          image_url?: string
          published?: boolean
          author_id?: string
        }
      }
      topics: {
        Row: {
          id: string
          created_at: string
          updated_at: string | null
          title: string
          description: string
          icon: string
          color: string
          image_url: string
          article_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string | null
          title: string
          description: string
          icon: string
          color?: string
          image_url: string
          article_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string | null
          title?: string
          description?: string
          icon?: string
          color?: string
          image_url?: string
          article_count?: number
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
  }
}