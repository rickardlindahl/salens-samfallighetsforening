export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      documents: {
        Row: {
          created_at: string;
          description: string;
          email_notification_sent: boolean;
          email_notification_sent_at: string | null;
          file_name: string;
          file_size: number;
          id: string;
          profile_id: string;
          storage_path: string;
          user_id: string;
        };
        Insert: {
          created_at: string;
          description: string;
          email_notification_sent?: boolean;
          email_notification_sent_at?: string | null;
          file_name: string;
          file_size: number;
          id?: string;
          profile_id: string;
          storage_path: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string;
          email_notification_sent?: boolean;
          email_notification_sent_at?: string | null;
          file_name?: string;
          file_size?: number;
          id?: string;
          profile_id?: string;
          storage_path?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "documents_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "documents_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      household_members: {
        Row: {
          house_id: string;
          id: string;
          profile_id: string;
          user_id: string;
        };
        Insert: {
          house_id: string;
          id?: string;
          profile_id: string;
          user_id: string;
        };
        Update: {
          house_id?: string;
          id?: string;
          profile_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "household_members_house_id_fkey";
            columns: ["house_id"];
            referencedRelation: "houses";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "household_members_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "household_members_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      houses: {
        Row: {
          house_number: number;
          id: string;
          street_address: string;
        };
        Insert: {
          house_number: number;
          id?: string;
          street_address: string;
        };
        Update: {
          house_number?: number;
          id?: string;
          street_address?: string;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          body: Json | null;
          draft: boolean;
          email_notification_sent: boolean;
          email_notification_sent_at: string | null;
          id: string;
          image: string | null;
          profile_id: string;
          publish_date: string | null;
          title: string;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          body?: Json | null;
          draft?: boolean;
          email_notification_sent?: boolean;
          email_notification_sent_at?: string | null;
          id?: string;
          image?: string | null;
          profile_id: string;
          publish_date?: string | null;
          title: string;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          body?: Json | null;
          draft?: boolean;
          email_notification_sent?: boolean;
          email_notification_sent_at?: string | null;
          id?: string;
          image?: string | null;
          profile_id?: string;
          publish_date?: string | null;
          title?: string;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          email: string;
          enable_notification_email_new_documents: boolean;
          enable_notification_email_new_posts: boolean;
          full_name: string | null;
          id: string;
          role: Database["public"]["Enums"]["role_enum"];
          updated_at: string | null;
        };
        Insert: {
          email: string;
          enable_notification_email_new_documents?: boolean;
          enable_notification_email_new_posts?: boolean;
          full_name?: string | null;
          id: string;
          role?: Database["public"]["Enums"]["role_enum"];
          updated_at?: string | null;
        };
        Update: {
          email?: string;
          enable_notification_email_new_documents?: boolean;
          enable_notification_email_new_posts?: boolean;
          full_name?: string | null;
          id?: string;
          role?: Database["public"]["Enums"]["role_enum"];
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      role_enum: "admin" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null;
          avif_autodetection: boolean | null;
          created_at: string | null;
          file_size_limit: number | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          allowed_mime_types?: string[] | null;
          avif_autodetection?: boolean | null;
          created_at?: string | null;
          file_size_limit?: number | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey";
            columns: ["owner"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
          version: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey";
            columns: ["bucket_id"];
            referencedRelation: "buckets";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string;
          name: string;
          owner: string;
          metadata: Json;
        };
        Returns: undefined;
      };
      extension: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      filename: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      foldername: {
        Args: {
          name: string;
        };
        Returns: unknown;
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: {
          size: number;
          bucket_id: string;
        }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits?: number;
          levels?: number;
          offsets?: number;
          search?: string;
          sortcolumn?: string;
          sortorder?: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
