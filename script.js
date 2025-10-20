// In-memory database
const database = {
    models: [
        {
            id: 1,
            name: "Faster R-CNN + EfficientNet-B7",
            accuracy: 96,
            runtime: "2m 34s",
            widthGain: 64,
            lengthGain: 86,
            depthGain: 34,
            createdAt: new Date("2025-01-15")
        },
        {
            id: 2,
            name: "YOLOv8 + ResNet50",
            accuracy: 92,
            runtime: "1m 45s",
            widthGain: 58,
            lengthGain: 79,
            depthGain: 28,
            createdAt: new Date("2025-01-10")
        }
    ],
    severityData: [
        { day: "Mon", severity: 120 },
        { day: "Tue", severity: 160 },
        { day: "Wed", severity: 140 },
        { day: "Thu", severity: 90 },
        { day: "Fri", severity: 110 },
        { day: "Sat", severity: 200 },
        { day: "Sun", severity: 85 }
    ],
    users: [
        { id: 1, name: "Sam Wheeler", email: "samwheeler@example.com", points: 637, accuracy: 85, tier: 3 },
        { id: 2, name: "John Doe", email: "john@example.com", points: 520, accuracy: 78, tier: 2 }
    ],
    regions: [
        { id: 1, name: "Southeast Region", pointsPerUser: 52, tier: 3 }
    ]
};

// Chart initialization
function initChart() {
    const canvas = document.getElementById('severityChart');
    const ctx = canvas.getContext('2d');
    
    const data = database.severityData;
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 300;
    
    const maxValue = Math.max(...data.map(d => d.severity));
    const padding = 60;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);
    
    // Y-axis labels and grid lines
    ctx.fillStyle = '#999';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        const value = Math.round((maxValue / 4) * (4 - i));
        ctx.fillText(value, padding - 10, y + 4);
        
        ctx.strokeStyle = '#e0e0e0';
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw bars
    const barWidth = chartWidth / data.length;
    ctx.fillStyle = '#6b5ba1';
    
    data.forEach((item, index) => {
        const x = padding + (index * barWidth) + (barWidth * 0.2);
        const barHeight = (item.severity / maxValue) * chartHeight;
        const y = height - padding - barHeight;
        
        ctx.fillRect(x, y, barWidth * 0.6, barHeight);
    });
    
    // X-axis labels
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    data.forEach((item, index) => {
        const x = padding + (index * barWidth) + (barWidth / 2);
        const y = height - padding + 25;
        ctx.fillText(item.day, x, y);
    });
}

// Load dashboard data
function loadDashboard() {
    const model = database.models[0];
    document.getElementById('modelTitle').textContent = model.name;
    document.getElementById('accuracy').textContent = model.accuracy + '%';
    document.getElementById('runtime').textContent = model.runtime;
    document.getElementById('widthGain').textContent = model.widthGain + '%';
    document.getElementById('lengthGain').textContent = model.lengthGain + '%';
    document.getElementById('depthGain').textContent = '+' + model.depthGain + '%';
    
    initChart();
}

// Event listeners
document.getElementById('timeframeFilter').addEventListener('change', (e) => {
    console.log('Timeframe changed to:', e.target.value);
    loadDashboard();
});

document.getElementById('peopleFilter').addEventListener('change', (e) => {
    console.log('People filter changed to:', e.target.value);
});

document.getElementById('topicFilter').addEventListener('change', (e) => {
    console.log('Topic filter changed to:', e.target.value);
});

document.getElementById('timeFilter').addEventListener('change', (e) => {
    console.log('Chart time filter changed to:', e.target.value);
    initChart();
});

// Initialize on load
window.addEventListener('load', loadDashboard);
window.addEventListener('resize', () => {
    initChart();
});