"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Container,
} from "@mui/material";

interface TrashItem {
  name: string;
  reading: string;
  category: string;
  notes: string;
}

const ApSearch = () => {
  const [searchText, setSearchText] = useState("");
  const [trashData, setTrashData] = useState<TrashItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCsvData = async () => {
      try {
        const response = await fetch("/csv/trush-search.csv");
        const text = await response.text();

        const lines = text.trim().split("\n");
        const data: TrashItem[] = lines
          .filter((line) => line.trim())
          .map((line) => {
            const [name, reading, category, notes = ""] = line
              .split(",")
              .map((item) => item.trim());
            return { name, reading, category, notes };
          });

        setTrashData(data);
      } catch (error) {
        console.error("CSV読み込みエラー:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCsvData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return [];

    return trashData.filter(
      (item) =>
        item.name.includes(searchText) ||
        item.reading.includes(searchText) ||
        item.category.includes(searchText)
    );
  }, [searchText, trashData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography>読み込み中...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="ごみの種類を検索"
          value={searchText}
          onChange={handleSearch}
          placeholder="例: ペットボトル、テレビ、燃えるごみ"
          variant="outlined"
        />
      </Box>

      {searchText && (
        <Box>
          <Typography variant="h6" sx={{ mb: 2 }}>
            検索結果: {filteredData.length}件
          </Typography>

          {filteredData.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>品目</TableCell>
                    <TableCell>読み方</TableCell>
                    <TableCell>分別区分</TableCell>
                    <TableCell>備考</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.reading}</TableCell>
                      <TableCell>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "bold",
                            color:
                              item.category === "燃えるごみ"
                                ? "success.main"
                                : item.category === "燃えないごみ"
                                ? "warning.main"
                                : item.category === "粗大ごみ"
                                ? "error.main"
                                : item.category === "危険ごみ"
                                ? "error.dark"
                                : item.category === "捨てられない"
                                ? "grey.600"
                                : "primary.main",
                          }}
                        >
                          {item.category}
                        </Typography>
                      </TableCell>
                      <TableCell>{item.notes}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography color="text.secondary">
              該当する項目が見つかりませんでした。
            </Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default ApSearch;
