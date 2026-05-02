import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt

st.set_page_config(page_title="Finance Tracker", layout="centered", page_icon="💰")

st.title("💰 Personal Finance Tracker")


# Clean data - One entry per category per month
data = {
    'month': ['Jan-2026', 'Jan-2026', 'Jan-2026', 'Jan-2026', 'Jan-2026', 'Jan-2026',
              'Feb-2026', 'Feb-2026', 'Feb-2026', 'Feb-2026', 'Feb-2026', 'Feb-2026',
              'Mar-2026', 'Mar-2026', 'Mar-2026', 'Mar-2026', 'Mar-2026', 'Mar-2026',
              'Apr-2026', 'Apr-2026', 'Apr-2026', 'Apr-2026', 'Apr-2026', 'Apr-2026'],
    
    'category': ['Food', 'Grocery', 'Travel', 'Health', 'Shopping', 'Billing'] * 4,
    
    'amount': [5200, 7200, 4500, 1800, 9800, 2500,
               6100, 8500, 3800, 2200, 11200, 2900,
               4800, 6800, 4100, 1400, 9500, 2600,
               5700, 7900, 3300, 1950, 10500, 2800]
}

df = pd.DataFrame(data)

st.sidebar.header("Filters")
selected_month = st.sidebar.selectbox("Select Month", sorted(df['month'].unique()))

filtered_df = df[df['month'] == selected_month]

st.subheader(f"📅 Spending Report - {selected_month}")

col1, col2 = st.columns(2)
col1.metric("Total Transactions", len(filtered_df))
col2.metric("Total Spent", f"Rs. {filtered_df['amount'].sum():,}")

st.subheader("Spending by Category")
spending = filtered_df.groupby('category')['amount'].sum().sort_values(ascending=False)

st.bar_chart(spending, use_container_width=True)

if st.checkbox("Show Pie Chart"):
    fig, ax = plt.subplots(figsize=(8,6))
    spending.plot(kind='pie', autopct='%1.1f%%', ax=ax)
    ax.set_ylabel('')
    st.pyplot(fig)

if st.checkbox("Show All Transactions"):
    st.dataframe(filtered_df.reset_index(drop=True), use_container_width=True)

st.caption("Personal Finance Dashboard - 2026")