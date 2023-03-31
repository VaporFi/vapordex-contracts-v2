// SPDX-License-Identifier: GPL-2.0-or-later
import '@vapordex/v2-core/contracts/interfaces/IVaporDEXV2Pool.sol';

pragma solidity >=0.6.0;

import '../libraries/PoolTicksCounter.sol';

contract PoolTicksCounterTest {
    using PoolTicksCounter for IVaporDEXV2Pool;

    function countInitializedTicksCrossed(
        IVaporDEXV2Pool pool,
        int24 tickBefore,
        int24 tickAfter
    ) external view returns (uint32 initializedTicksCrossed) {
        return pool.countInitializedTicksCrossed(tickBefore, tickAfter);
    }
}
