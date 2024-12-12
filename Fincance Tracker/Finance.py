import tkinter as tk
from tkinter import messagebox
import pandas as pd
import matplotlib.pyplot as plt

# Global DataFrame to store entries
data = pd.DataFrame(columns=["Date", "Category", "Type", "Amount"])

# Functions
def add_entry():
    date = date_entry.get()
    category = category_entry.get()
    type_ = type_var.get()
    amount = amount_entry.get()
    if not (date and category and type_ and amount):
        messagebox.showerror("Error", "All fields must be filled!")
        return
    try:
        amount = float(amount)
        global data
        data = pd.concat([data, pd.DataFrame([[date, category, type_, amount]], columns=data.columns)])
        messagebox.showinfo("Success", "Entry added!")
        clear_fields()
    except ValueError:
        messagebox.showerror("Error", "Amount must be a number!")

def clear_fields():
    date_entry.delete(0, tk.END)
    category_entry.delete(0, tk.END)
    amount_entry.delete(0, tk.END)

def view_summary():
    if data.empty:
        messagebox.showinfo("Summary", "No data to summarize.")
        return
    summary = data.groupby(["Category", "Type"]).sum().reset_index()
    messagebox.showinfo("Summary", summary.to_string(index=False))

def plot_expenses():
    if data.empty:
        messagebox.showinfo("Plot", "No data to plot.")
        return
    expense_data = data[data["Type"] == "Expense"].groupby("Category").sum()
    if expense_data.empty:
        messagebox.showinfo("Plot", "No expenses to plot.")
        return
    expense_data.plot.pie(y="Amount", autopct="%1.1f%%", figsize=(5, 5))
    plt.title("Expenses by Category")
    plt.ylabel("")
    plt.show()

# GUI Setup
root = tk.Tk()
root.title("Personal Finance Tracker")

tk.Label(root, text="Date (YYYY-MM-DD):").grid(row=0, column=0)
date_entry = tk.Entry(root)
date_entry.grid(row=0, column=1)

tk.Label(root, text="Category:").grid(row=1, column=0)
category_entry = tk.Entry(root)
category_entry.grid(row=1, column=1)

tk.Label(root, text="Type (Expense/Income):").grid(row=2, column=0)
type_var = tk.StringVar(value="Expense")
tk.Radiobutton(root, text="Expense", variable=type_var, value="Expense").grid(row=2, column=1, sticky="w")
tk.Radiobutton(root, text="Income", variable=type_var, value="Income").grid(row=2, column=1, sticky="e")

tk.Label(root, text="Amount:").grid(row=3, column=0)
amount_entry = tk.Entry(root)
amount_entry.grid(row=3, column=1)

tk.Button(root, text="Add Entry", command=add_entry).grid(row=4, column=0)
tk.Button(root, text="View Summary", command=view_summary).grid(row=4, column=1)
tk.Button(root, text="Plot Expenses", command=plot_expenses).grid(row=5, column=0, columnspan=2)

root.mainloop()
