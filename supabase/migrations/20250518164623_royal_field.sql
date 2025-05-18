/*
  # Schema inicial do Finmarket Explorer

  1. Novas Tabelas
    - `profiles`
      - Dados do perfil do usuário
      - Vinculado à tabela auth.users do Supabase
    - `favorite_stocks` 
      - Ações favoritas dos usuários
      - Relacionamento com profiles
    - `stock_searches`
      - Histórico de pesquisas de ações
      - Permite análise de uso e sugestões personalizadas

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas para garantir que usuários só acessem seus próprios dados
*/

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own profile" 
  ON profiles FOR SELECT 
  TO authenticated 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE 
  TO authenticated 
  USING (auth.uid() = id);

-- Favorite stocks table
CREATE TABLE IF NOT EXISTS favorite_stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  name text,
  added_at timestamptz DEFAULT now(),
  UNIQUE(user_id, symbol)
);

ALTER TABLE favorite_stocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their favorite stocks" 
  ON favorite_stocks FOR ALL 
  TO authenticated 
  USING (auth.uid() = user_id);

-- Stock searches history
CREATE TABLE IF NOT EXISTS stock_searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  symbol text NOT NULL,
  searched_at timestamptz DEFAULT now()
);

ALTER TABLE stock_searches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their search history" 
  ON stock_searches FOR SELECT 
  TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add to search history" 
  ON stock_searches FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = user_id);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();