// stubbed anchor-lang-idl, no regex
// Minimal stub of anchor-lang-idl to satisfy anchor-attribute-program

pub mod types {
    #[derive(Clone, Debug)]
    pub struct Idl;

    #[derive(Clone, Debug)]
    pub struct IdlType;

    #[derive(Clone, Debug)]
    pub struct IdlSerialization;
}

pub mod convert {
    use super::types::Idl;

    pub fn convert_idl(_idl: &Idl) -> Idl {
        // no-op stub
        Idl
    }
}
