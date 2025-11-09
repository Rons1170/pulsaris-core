use anchor_lang::prelude::*;

declare_id!("H9KcwtZEukpbWjtCKTupph3XM6ZwJReUHb1Y4q4bD8H7");

#[program]
pub mod pulsaris_master_token {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.authority = ctx.accounts.user.key();
        state.supply = 0;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + std::mem::size_of::<MasterTokenState>()
    )]
    pub state: Account<'info, MasterTokenState>,

    #[account(mut)]
    pub user: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct MasterTokenState {
    pub authority: Pubkey,
    pub supply: u64,
}
