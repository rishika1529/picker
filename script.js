document.addEventListener("DOMContentLoaded", async function () {
    const ctx = document.getElementById("usageChart").getContext("2d");
    const chartTypeSelector = document.getElementById("chartType");
    const dailyBtn = document.getElementById("dailyBtn");
    const weeklyBtn = document.getElementById("weeklyBtn");

    let currentChartType = "bar";
    let usageData = {};

    // Simulated API fetch - replace with real API call
    async function fetchUsageData(period = "daily") {
        return new Promise((resolve) => {
            setTimeout(() => {
                const dailyUsage = {
                    labels: ["YouTube", "Instagram", "Reddit", "Twitter", "Facebook"],
                    usage: [3, 2.5, 1.2, 0.8, 1.5], // Hours per day
                };
                const weeklyUsage = {
                    labels: ["YouTube", "Instagram", "Reddit", "Twitter", "Facebook"],
                    usage: [15, 12, 8, 6, 10], // Hours per week
                };
                resolve(period === "weekly" ? weeklyUsage : dailyUsage);
            }, 1000);
        });
    }

    // Function to create a new chart
    function createChart(data) {
        if (window.usageChart) {
            window.usageChart.destroy();
        }

        window.usageChart = new Chart(ctx, {
            type: currentChartType,
            data: {
                labels: data.labels,
                datasets: [{
                    label: "Time Spent (hours)",
                    data: data.usage,
                    backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A8", "#FFD700"],
                    borderColor: ["#C70039", "#2ECC71", "#1F618D", "#C0392B", "#D4AC0D"],
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                scales: currentChartType === "pie" ? {} : { y: { beginAtZero: true } },
            },
        });
    }

    // Fetch and display initial daily data
    usageData = await fetchUsageData("daily");
    createChart(usageData);

    // Event listener for chart type change
    chartTypeSelector.addEventListener("change", () => {
        currentChartType = chartTypeSelector.value;
        createChart(usageData);
    });

    // Event listener for daily/weekly data switch
    dailyBtn.addEventListener("click", async () => {
        usageData = await fetchUsageData("daily");
        createChart(usageData);
    });

    weeklyBtn.addEventListener("click", async () => {
        usageData = await fetchUsageData("weekly");
        createChart(usageData);
    });
});
