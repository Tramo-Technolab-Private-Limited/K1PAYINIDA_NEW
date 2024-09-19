import { Stack, Box } from "@mui/material";
import Chart from "react-apexcharts";

const DonutView = (props: any) => {
  const series = [60, 30, 10];
  const options: any = {
    chart: {
      type: "donut",
      height: 50,
    },
    labels: ["Success", "Pending", "Failed"],
    legend: {
      position: "bottom",
    },
    colors: ["#4CAF50", "#FFC107", "#F44336"],
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        return (
          opts.w.globals.labels[opts.seriesIndex] + ": " + val.toFixed(0) + "%"
        );
      },
      style: {
        colors: ["#fff"],
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const services = [
    { name: "Bill Payments", color: "#1E90FF" },
    { name: "Payout", color: "#32CD32" },
    { name: "Money Transfer", color: "#FF4500" },
    { name: "AEPS", color: "#FFD700" },
    { name: "Aadhar Pay", color: "#8A2BE2" },
    { name: "mATM", color: "#00CED1" },
    { name: "Indo Nepal", color: "#FF6347" },
    { name: "Recharge", color: "#4B0082" },
  ];

  return (
    <Stack spacing={4}>
      <Stack spacing={2} mb={2}>
        <Box
          display="flex"
          flexWrap="wrap"
          gap={2}
          justifyContent="center"
          sx={{ maxWidth: "100%", overflowX: "auto" }}
        >
          {services.map((service, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              sx={{
                fontSize: "14px",
                whiteSpace: "nowrap",
              }}
            >
              <Box
                sx={{
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  backgroundColor: service.color,
                  marginRight: "8px",
                }}
              />
              {service.name}
            </Box>
          ))}
        </Box>
      </Stack>
      <Chart
        options={options}
        series={series}
        type="donut"
        height={props.chartHeight || 350}
      />
    </Stack>
  );
};

export default DonutView;
