import { useState } from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box,} from "@mui/material";

interface Rule {
    game: string;
    entryCost: string;
    winPoints: string;
}

const initialRules: Rule[] = [
    { game: "ポーカー", entryCost: "30~100", winPoints: "最終所持点数" },
    { game: "麻雀", entryCost: "250", winPoints: "最終所持点数" },
    { game: "ブラックジャック", entryCost: "1~1000(所持点数が1000点以下の人のみ参加可能)", winPoints: "最終所持点数" },
    { game: "カタン", entryCost: "200", winPoints: "1位:400 2位:300 3位:100 4位:0" },
    { game: "花札", entryCost: "0~", winPoints: "勝者に譲渡" },
    { game: "将棋", entryCost: "200~任意", winPoints: "勝者に譲渡" },
];

const PointTable = () => {
    const [rules] = useState(initialRules);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                ポイントルール
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ゲーム</TableCell>
                            <TableCell>参加費用（ポイント）</TableCell>
                            <TableCell>獲得ポイント</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rules.map((rule, index) => (
                            <TableRow key={index}>
                                <TableCell>{rule.game}</TableCell>
                                <TableCell>{rule.entryCost}</TableCell>
                                <TableCell>{rule.winPoints}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default PointTable;
