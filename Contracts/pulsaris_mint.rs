use anchor_lang::prelude::*;
use anchor_spl::token::{Mint, TokenAccount};

#[derive(Accounts)]
pub struct InitializeMint {
#[account(init, payer = user, space = 82)]
pub mint: Account,
pub rent: Sysvar,
pub user: Signer,
pub system_program: Program,
}

pub fn initialize_mint(ctx: Context) -> Result {
let mint = &mut ctx.accounts.mint;
mint.decimals = 9;
mint.mint_authority = Some(ctx.accounts.user.key());
Ok(())
}
```
