use anchor_lang::prelude::*;

declare_id!("EuU9CKeysiH9xsFBD2B4n3dqry6CSzFAY4tcadZ5eFtN");

#[program]
pub mod pulsaris_master_token {
    use super::*;

    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
