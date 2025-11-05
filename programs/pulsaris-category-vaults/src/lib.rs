use anchor_lang::prelude::*;

declare_id!("Gh4K4joEfrm2P3k1MHNBAWNobXWuuJHNNwFMpStiJVcK");

#[program]
pub mod pulsaris_category_vaults {
    use super::*;

pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}
    
#[derive(Accounts)]
pub struct Initialize {}

// programs/pulsaris-category-vaults/src/state.rs

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum Category {
    Commodities,      // 0
    Equities,         // 1
    Indices,          // 2
    Forex,            // 3
    CryptoMajors,     // 4
    Altcoins,         // 5
    FixedIncome,      // 6
    RealEstate,       // 7
    Experimental,     // 8
}

impl Category {
    pub fn as_u8(&self) -> u8 {
        match self {
            Category::Commodities => 0,
            Category::Equities => 1,
            Category::Indices => 2,
            Category::Forex => 3,
            Category::CryptoMajors => 4,
            Category::Altcoins => 5,
            Category::FixedIncome => 6,
            Category::RealEstate => 7,
            Category::Experimental => 8,
        }
    }
}

#[account]
pub struct Vault {
    pub category: u8,        // Category as u8
    pub is_long: bool,       // true = long, false = short
    pub authority: Pubkey,   // master token authority
    pub mint: Pubkey,        // asset mint tied to this vault
    pub bump: u8,
}
