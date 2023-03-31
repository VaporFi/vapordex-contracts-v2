// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

/// @title Callback for IVaporDEXV2PoolActions#flash
/// @notice Any contract that calls IVaporDEXV2PoolActions#flash must implement this interface
interface IVaporDEXV2FlashCallback {
    /// @notice Called to `msg.sender` after transferring to the recipient from IVaporDEXV2Pool#flash.
    /// @dev In the implementation you must repay the pool the tokens sent by flash plus the computed fee amounts.
    /// The caller of this method must be checked to be a VaporDEXV2Pool deployed by the canonical VaporDEXV2Factory.
    /// @param fee0 The fee amount in token0 due to the pool by the end of the flash
    /// @param fee1 The fee amount in token1 due to the pool by the end of the flash
    /// @param data Any data passed through by the caller via the IVaporDEXV2PoolActions#flash call
    function VaporDEXV2FlashCallback(uint256 fee0, uint256 fee1, bytes calldata data) external;
}
