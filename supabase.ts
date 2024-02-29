export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      Car_Details: {
        Row: {
          Car_id: number
          Color: string | null
          Model: string | null
        }
        Insert: {
          Car_id?: number
          Color?: string | null
          Model?: string | null
        }
        Update: {
          Car_id?: number
          Color?: string | null
          Model?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Car_Details_Model_fkey"
            columns: ["Model"]
            isOneToOne: false
            referencedRelation: "Car_Make_Model"
            referencedColumns: ["Model"]
          }
        ]
      }
      Car_Make_Model: {
        Row: {
          Make: string | null
          Model: string
        }
        Insert: {
          Make?: string | null
          Model: string
        }
        Update: {
          Make?: string | null
          Model?: string
        }
        Relationships: []
      }
      City_Info: {
        Row: {
          City_id: number
          CityName: string | null
        }
        Insert: {
          City_id?: number
          CityName?: string | null
        }
        Update: {
          City_id?: number
          CityName?: string | null
        }
        Relationships: []
      }
      Customer: {
        Row: {
          Address: string | null
          Customer_id: number
          Email: string | null
          FirstName: string | null
          LastName: string | null
          Phone: string | null
        }
        Insert: {
          Address?: string | null
          Customer_id?: number
          Email?: string | null
          FirstName?: string | null
          LastName?: string | null
          Phone?: string | null
        }
        Update: {
          Address?: string | null
          Customer_id?: number
          Email?: string | null
          FirstName?: string | null
          LastName?: string | null
          Phone?: string | null
        }
        Relationships: []
      }
      Order_Details_: {
        Row: {
          Customer_id: number | null
          NumberOfDays: number | null
          Order_id: number
          Price_id: number | null
          totalPrice: number | null
        }
        Insert: {
          Customer_id?: number | null
          NumberOfDays?: number | null
          Order_id?: number
          Price_id?: number | null
          totalPrice?: number | null
        }
        Update: {
          Customer_id?: number | null
          NumberOfDays?: number | null
          Order_id?: number
          Price_id?: number | null
          totalPrice?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Order_Details_duplicate_Customer_id_fkey"
            columns: ["Customer_id"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["Customer_id"]
          },
          {
            foreignKeyName: "public_Order_Details_duplicate_Price_id_fkey"
            columns: ["Price_id"]
            isOneToOne: false
            referencedRelation: "Price_Catalog"
            referencedColumns: ["price_id"]
          }
        ]
      }
      Order_Pricing: {
        Row: {
          NumberOfDays: number
          Price_id: number
          TotalPrice: number | null
        }
        Insert: {
          NumberOfDays: number
          Price_id?: number
          TotalPrice?: number | null
        }
        Update: {
          NumberOfDays?: number
          Price_id?: number
          TotalPrice?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Order_Pricing_Price_id_fkey"
            columns: ["Price_id"]
            isOneToOne: false
            referencedRelation: "Price_Catalog"
            referencedColumns: ["price_id"]
          }
        ]
      }
      Price_Catalog: {
        Row: {
          Car_id: number | null
          City_id: number | null
          initial_quantity: number | null
          Price: number | null
          price_id: number
          Quantity: number | null
        }
        Insert: {
          Car_id?: number | null
          City_id?: number | null
          initial_quantity?: number | null
          Price?: number | null
          price_id?: number
          Quantity?: number | null
        }
        Update: {
          Car_id?: number | null
          City_id?: number | null
          initial_quantity?: number | null
          Price?: number | null
          price_id?: number
          Quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_Price_Catalog_Car_id_fkey"
            columns: ["Car_id"]
            isOneToOne: false
            referencedRelation: "Car_Details"
            referencedColumns: ["Car_id"]
          },
          {
            foreignKeyName: "public_Price_Catalog_City_id_fkey"
            columns: ["City_id"]
            isOneToOne: false
            referencedRelation: "City_Info"
            referencedColumns: ["City_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      insert_customer_return_id: {
        Args: {
          c_firstname: string
          c_lastname: string
          c_phone: string
          c_email: string
          c_address: string
        }
        Returns: number
      }
      insert_order_details: {
        Args: {
          o_customer_id: number
          o_price_id: number
          o_numberofdays: number
          o_totalprice: number
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
