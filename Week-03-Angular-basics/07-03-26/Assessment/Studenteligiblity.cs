using System;

namespace StudentEligibilitySystem
{
    // 1. Entity Class
    class Student
    {
        public int StudentId { get; set; }
        public string Name { get; set; }
        public int Marks { get; set; }
        public int Age { get; set; }
        public int Attendance { get; set; }
    }

    // 3. Eligibility Engine
    class EligibilityEngine
    {
        public void CheckEligibility(Student student, string program, Predicate<Student> rule)
        {
            bool result = rule(student);

            Console.WriteLine("========= ELIGIBILITY CHECK =========");
            Console.WriteLine("Student Name : " + student.Name);
            Console.WriteLine("Program      : " + program);
            Console.WriteLine("Eligible     : " + result);
            Console.WriteLine("-----------------------------------\n");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            // 4. Create Student Object (Hardcoded Dataset)
            Student student = new Student
            {
                StudentId = 301,
                Name = "Ananya",
                Marks = 78,
                Age = 18,
                Attendance = 85
            };

            // 2. Define Eligibility Predicates

            // Engineering Rule
            Predicate<Student> engineeringEligibility = s => s.Marks >= 60;

            // Medical Rule
            Predicate<Student> medicalEligibility = s => s.Marks >= 70 && s.Age >= 17;

            // Management Rule
            Predicate<Student> managementEligibility = s => s.Marks >= 55 && s.Attendance >= 75;

            // Create Eligibility Engine
            EligibilityEngine engine = new EligibilityEngine();

            // Validate Programs
            engine.CheckEligibility(student, "Engineering", engineeringEligibility);
            engine.CheckEligibility(student, "Medical", medicalEligibility);
            engine.CheckEligibility(student, "Management", managementEligibility);

            Console.ReadLine();
        }
    }
}
























