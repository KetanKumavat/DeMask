import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface DetailedReportProps {
  results: any[]
}

export default function DetailedReport({ results }: DetailedReportProps) {
  return (
    <div className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-blue-800">Detailed Report</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="bg-blue-100">Timestamp</TableHead>
              <TableHead className="bg-blue-100">Model Result</TableHead>
              <TableHead className="bg-blue-100">Model Output</TableHead>
              <TableHead className="bg-blue-100">Reasons to Flag</TableHead>
              <TableHead className="bg-blue-100">Confidence Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index} className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}>
                <TableCell>{result.timestamp}</TableCell>
                <TableCell>{result.modelResult}</TableCell>
                <TableCell>{result.modelOutput.toFixed(2)}</TableCell>
                <TableCell>{result.reasonsToFlag.join(", ")}</TableCell>
                <TableCell>{result.confidenceScore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

