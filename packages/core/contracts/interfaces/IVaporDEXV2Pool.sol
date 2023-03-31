// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IVaporDEXV2PoolImmutables.sol';
import './pool/IVaporDEXV2PoolState.sol';
import './pool/IVaporDEXV2PoolDerivedState.sol';
import './pool/IVaporDEXV2PoolActions.sol';
import './pool/IVaporDEXV2PoolOwnerActions.sol';
import './pool/IVaporDEXV2PoolEvents.sol';

/// @title The interface for a VaporDEX V2 Pool
/// @notice A Uniswap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IVaporDEXV2Pool is
    IVaporDEXV2PoolImmutables,
    IVaporDEXV2PoolState,
    IVaporDEXV2PoolDerivedState,
    IVaporDEXV2PoolActions,
    IVaporDEXV2PoolOwnerActions,
    IVaporDEXV2PoolEvents
{

}
