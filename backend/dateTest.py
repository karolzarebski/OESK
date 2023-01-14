from datetime import datetime

date = "13012023"

parsed = datetime.strptime(date, "%d%m%Y").date()

print(parsed)

formatted = parsed.strftime("%d/%m/%Y")

print(formatted)
