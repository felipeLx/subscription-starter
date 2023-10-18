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
      banks: {
        Row: {
          country_id: string | null
          id: string
          logo: string
          name: string
        }
        Insert: {
          country_id?: string | null
          id?: string
          logo: string
          name: string
        }
        Update: {
          country_id?: string | null
          id?: string
          logo?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "banks_country_id_fkey"
            columns: ["country_id"]
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      countries: {
        Row: {
          country: string
          flag: string
          id: string
        }
        Insert: {
          country: string
          flag: string
          id?: string
        }
        Update: {
          country?: string
          flag?: string
          id?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      payments: {
        Row: {
          bank_id: string | null
          id: string
          information: string | null
          limits: string | null
          symbol: string
          type: string
        }
        Insert: {
          bank_id?: string | null
          id?: string
          information?: string | null
          limits?: string | null
          symbol: string
          type: string
        }
        Update: {
          bank_id?: string | null
          id?: string
          information?: string | null
          limits?: string | null
          symbol?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_bank_id_fkey"
            columns: ["bank_id"]
            referencedRelation: "banks"
            referencedColumns: ["id"]
          }
        ]
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      steps: {
        Row: {
          id: string
          payment_id: string | null
          st1_pic: string | null
          st1_text: string | null
          st2_pic: string | null
          st2_text: string | null
          st3_pic: string | null
          st3_text: string | null
          st4_pic: string | null
          st4_text: string | null
          st5_pic: string | null
          st5_text: string | null
          st6_pic: string | null
          st6_text: string | null
        }
        Insert: {
          id?: string
          payment_id?: string | null
          st1_pic?: string | null
          st1_text?: string | null
          st2_pic?: string | null
          st2_text?: string | null
          st3_pic?: string | null
          st3_text?: string | null
          st4_pic?: string | null
          st4_text?: string | null
          st5_pic?: string | null
          st5_text?: string | null
          st6_pic?: string | null
          st6_text?: string | null
        }
        Update: {
          id?: string
          payment_id?: string | null
          st1_pic?: string | null
          st1_text?: string | null
          st2_pic?: string | null
          st2_text?: string | null
          st3_pic?: string | null
          st3_text?: string | null
          st4_pic?: string | null
          st4_text?: string | null
          st5_pic?: string | null
          st5_text?: string | null
          st6_pic?: string | null
          st6_text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "steps_payment_id_fkey"
            columns: ["payment_id"]
            referencedRelation: "payments"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          billing_address: Json | null
          full_name: string | null
          id: string
          payment_method: Json | null
        }
        Insert: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id: string
          payment_method?: Json | null
        }
        Update: {
          avatar_url?: string | null
          billing_address?: Json | null
          full_name?: string | null
          id?: string
          payment_method?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
