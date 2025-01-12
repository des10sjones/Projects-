def pay():
     hours = input("Enter Total Hours Worked: ")

     hours_worked = float(hours)

     payRate = input("Pay per Hour: ")
     pay_rate = float(payRate)
     print("\n")




     def calc(hours,pay_rate):
          overtime = 0.0
          reg_pay = 0.0
          overtime_pay_rate = pay_rate * 1.5
          overtime_pay = 0.0

          if hours > 80:
               overtime = hours - 80
               overtime_pay = overtime * overtime_pay_rate
          
          reg_pay = (hours - overtime) * pay_rate 
          gross_pay = reg_pay + overtime_pay
          gross = float(gross_pay)
          print(f"Gross Pay = $ {gross:,.2f}") 
          print(f"Regular Pay = $ {reg_pay:,.2f}") 
          print(f"Overtime Pay = $ {overtime_pay:.2f}") 
          print(f"Overtime Hours =  {overtime:.2f}") 
          print(f"Overtime Pay Rate = $ {overtime_pay_rate:.2f}\n") 

          return gross

     def netPay(gross):
          tax = 0.204
          retirment = 0.05
          tax_total = gross * tax
          retirement_total = gross * retirment
          deductions = tax_total + retirement_total


          net_pay = gross - deductions

          print(f"Net Pay = 💵 $ {net_pay:,.2f}\n")
          print(f"Retirement = 👴 $ {retirement_total:,.2f}\n")
          print(f"Tax = 🧾 $ {tax_total:,.2f}\n")
          
          
          return net_pay 
     def budget(net):
          wellsFargo = net / 2
          regions = net / 2

          
          print(f"Wells Fargo: 🏦 $ {wellsFargo:,.2f}")
          print(f"Regions: 🏦 $ {regions:,.2f}\n ")

     def yearly(net, gross):
          yearly_salary = net * 26 
          gross_yearly_salary = gross * 26 
          montly_salary = net * 2
          gross_montly_salary = gross * 2

          print(f"Yearly Salary: 💸 $ {yearly_salary:,.2f} \nMonthly Salary: $ {montly_salary:,.2f}")
          print(f"Gross Yearly Salary: 💸 $ {gross_yearly_salary:,.2f} \nGross Monthly Salary: $ {gross_montly_salary:,.2f}")

          return montly_salary
     
   

     def splits(net, monthly_salary):
          print("\n*********Save/Needs/Wants*********")
          print("*                                *")
          print("*                                *")
          print("*                                *")
          print("*                                *")
          while True:
               save_perecentage = float(input("What % would you like to save ? %")) 
               
               needs_perecentage = float(input("What % would you like to spend on needs ? %")) 
               wants_perecentage = float(input("What % would you like to spend on wants ? %")) 
               
               if save_perecentage + needs_perecentage + wants_perecentage == 100:
                    break
               else:
                    print("Total Percentage Must Equal 100%\n")

          save = net * (save_perecentage / 100)
          needs = net * (needs_perecentage / 100)
          wants = net * (wants_perecentage / 100)

          car = 360
          car_insurance = 240
          student_loans = 207
          bills = car + car_insurance + student_loans

          monthly = monthly_salary - bills
          monthly_needs = needs * 2
          monthly_save = save * 2
          monthly_wants = wants * 2


          print(f"\nCar Cost: 🚗 ${car:.2f} Car Insurance: {car_insurance:.2f} Student Loans: ${student_loans}")
          print(f"Total Car/Loans: {bills:.2f}")
          print(f"After Paying Car and Student Loans: ${monthly:.2f}")

          print(f"\n\nSavings: 💰 ${save:.2f} Month: 💰 ${monthly_save:.2f} \nNecessities: 🚗🏠 ${needs:.2f} Monthly: 🚗🏠 ${monthly_needs:.2f}  \nWants: 🍻 ${wants:.2f} Month: 🍻 ${monthly_wants:.2f}")




          

          

          




     gross =  calc(hours_worked,pay_rate)

     net = netPay(gross)

     budget(net)

     monthly = yearly(net,gross)
     bud  = input("Do you want a simple Budget (Savings/Necessicties/Wants) ? (Answer Yes or No)  \n")
     bud = bud.lower()
     if bud == "yes":
          splits(net,monthly)


pay()
answer = input("Do you want to enter another entry? (Yes Or No) \n")
answer = answer.lower()
while answer == "yes":
     pay()
     answer = input("Do you want to enter another entry? (Yes Or No) \n")