use anchor_lang::prelude::*;

declare_id!("GyAkayDBE1XDiXYbukc7gGSi3ddZjPhP2aH8Lwmg2Hfs");

pub const DEFAULT_LEVERAGE_BPS: u32 = 50000; // 5x leverage
pub const DEFAULT_FEE_BPS: u16 = 500;        // 5% fee
pub const BPS_DENOMINATOR: u32 = 10000;      // 10000 = 1x or 100%

#[program]
pub mod pulsaris_hedge_manager {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let cfg = &mut ctx.accounts.pulsaris_config;
        cfg.authority = *ctx.accounts.authority.key;
        cfg.leverage_bps = DEFAULT_LEVERAGE_BPS;
        cfg.fee_bps = DEFAULT_FEE_BPS;
        cfg.bump = ctx.bumps.pulsaris_config;
        Ok(())
    }
}

#[account]
pub struct PulsarisConfig {
    pub authority: Pubkey,
    pub leverage_bps: u32,
    pub fee_bps: u16,
    pub bump: u8,
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        seeds = [b"pulsaris-config"],
        bump,
        space = 8 + 32 + 4 + 2 + 1
    )]
    pub pulsaris_config: Account<'info, PulsarisConfig>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
