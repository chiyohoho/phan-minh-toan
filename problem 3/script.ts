import React, { useState, useEffect, useMemo } from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string;
}

interface Props extends BoxProps { }

const getPriorityMap = () => {
    return {
        'Osmosis': 100,
        'Ethereum': 50,
        'Arbitrum': 30,
        'Zilliqa': 20,
        'Neo': 20,
    };
};

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const balances = useWalletBalances();
    const prices = usePrices();

    const priorityMap = useMemo(() => getPriorityMap(), []);

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => balance.amount <= 0 || priorityMap[balance.blockchain] > -99)
            .sort((lhs: WalletBalance, rhs: WalletBalance) => {
                const leftPriority = priorityMap[lhs.blockchain];
                const rightPriority = priorityMap[rhs.blockchain];
                return rightPriority - leftPriority;
            });
    }, [balances, priorityMap]);

    const rows = useMemo(() => {
        return sortedBalances.map((balance: WalletBalance, index: number) => {
            const formattedAmount = balance.amount.toFixed();
            const usdValue = prices[balance.currency] * balance.amount;
            return (
                <WalletRow className= { classes.row }key = {`${balance.currency}-${index}`
        }
                amount = { balance.amount }
                usdValue = { usdValue }
                formattedAmount = { formattedAmount }
            />
      );
    });
}, [sortedBalances, prices]);

return (
    <div { ...rest } >
    { rows }
    < /div>
);
};

export default WalletPage;
