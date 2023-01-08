import os
import sys
from datetime import datetime


class TestService:
    def __init__(self, test_configuration):
        self.programs_path = test_configuration['programs_path']

    def run_test(self, language, fib_count):
        if language == "C":
            path = self.programs_path['C']
        elif language == "C++":
            path = self.programs_path['C++']
        else:
            path = self.programs_path['C#']

        start = datetime.now()

        os.system(f"{os.path.join(sys.path[0])}{path} {fib_count}")

        return (datetime.now() - start).total_seconds()
