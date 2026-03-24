using System;
using System.Collections.Generic;
using System.Linq;

public class Student
{
    public int StudentId { get; set; }
    public string Name { get; set; }
    public int Marks { get; set; }
}

public class AnalysisEngine
{
    public void Analyze(List<Student> students)
    {
        Console.WriteLine("Passed Students:");
        Console.WriteLine(string.Join("\n",
            students.Where(s => s.Marks >= 50)
                    .Select(s => s.Name)));

        Console.WriteLine();

        Console.WriteLine("Topper:");
        Console.WriteLine(students
            .OrderByDescending(s => s.Marks)
            .Select(s => s.Name + " - " + s.Marks)
            .First());

        Console.WriteLine();

        Console.WriteLine("Students Sorted by Marks:");
        Console.WriteLine(string.Join("\n",
            students.OrderByDescending(s => s.Marks)
                    .Select(s => s.Name + " - " + s.Marks)));
    }
}

public class Solution
{
    public static void Main()
    {
        var students = new List<Student>
        {
            new Student { StudentId = 101, Name = "Ananya", Marks = 78 },
            new Student { StudentId = 102, Name = "Ravi", Marks = 45 },
            new Student { StudentId = 103, Name = "Neha", Marks = 88 },
            new Student { StudentId = 104, Name = "Arjun", Marks = 67 }
        };

        new AnalysisEngine().Analyze(students);
              Console.WriteLine();
    }
}