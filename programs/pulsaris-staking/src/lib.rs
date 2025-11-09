use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("Cd281Df6HDi63JiEmeYR9cnVPm6g2eL8uDbG7TdWKwQS");

#[program]
pub mod pulsaris_staking {
    use super::*;

pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
    Ok(())
}
    
pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
    let cpi_accounts = Transfer {
        from: ctx.accounts.user_token_account.to_account_info(),
        to: ctx.accounts.vault_token_account.to_account_info(),
        authority: ctx.accounts.user.to_account_info(),
    };
    let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
    token::transfer(cpi_ctx, amount)?;

    ctx.accounts.stake_state.amount += amount;
    ctx.accounts.stake_state.owner = ctx.accounts.user.key();
    Ok(())
}

pub fn unstake(ctx: Context<Unstake>, amount: u64) -> Result<()> {
    require!(
        ctx.accounts.stake_state.amount >= amount,
        ErrorCode::InsufficientStake
    );

    let cpi_accounts = Transfer {
        from: ctx.accounts.vault_token_account.to_account_info(),
        to: ctx.accounts.user_token_account.to_account_info(),
        authority: ctx.accounts.vault_authority.to_account_info(),
    };
 
    let vault_bump = ctx.bumps.vault_authority;
    let seeds: &[&[u8]] = &[b"vault".as_ref(), &[vault_bump][..]];
    let signer = &[seeds];

    let cpi_ctx = CpiContext::new_with_signer(
        ctx.accounts.token_program.to_account_info(),
        cpi_accounts,
        signer,
    );
    token::transfer(cpi_ctx, amount)?;

    ctx.accounts.stake_state.amount -= amount;
    Ok(())
}
} // closes #[program] pub mod pulsaris_staking

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = user,
        space = 8 + 40,
        seeds = [b"stake", user.key().as_ref()],
        bump
    )]
    pub stake_state: Account<'info, StakeState>,

    /// CHECK: PDA authority for vault
    #[account(seeds = [b"vault"], bump)]
    pub vault_authority: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,

    #[account(mut)]
    pub vault_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"stake", user.key().as_ref()],
        bump
    )]
    pub stake_state: Account<'info, StakeState>,

    /// CHECK: PDA authority for vault
    #[account(seeds = [b"vault"], bump)]
    pub vault_authority: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
}

#[account]
pub struct StakeState {
    pub owner: Pubkey,
    pub amount: u64,
}

#[error_code]
pub enum ErrorCode {
    #[msg("You don't have enough staked to unstake that amount.")]
    InsufficientStake,
}
