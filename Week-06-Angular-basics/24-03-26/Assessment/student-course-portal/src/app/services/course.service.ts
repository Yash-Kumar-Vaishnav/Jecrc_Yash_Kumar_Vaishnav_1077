import { Injectable } from '@angular/core';

export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  duration: string;
  level: string;
  rating: number;
  students: number;
  price: number;
  description: string;
  topics: string[];
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      instructor: 'Riya Sharma',
      category: 'Web Dev',
      duration: '12 Weeks',
      level: 'Intermediate',
      rating: 4.8,
      students: 3240,
      price: 4999,
      description: 'Master HTML, CSS, JavaScript, Angular, Node.js and MongoDB in this comprehensive full stack bootcamp designed for real-world projects.',
      topics: ['HTML & CSS', 'JavaScript ES6+', 'Angular 17', 'Node.js', 'MongoDB', 'REST APIs'],
      image: '💻'
    },
    {
      id: 2,
      title: 'Data Science with Python',
      instructor: 'Arjun Mehta',
      category: 'Data Science',
      duration: '10 Weeks',
      level: 'Beginner',
      rating: 4.7,
      students: 2810,
      price: 5499,
      description: 'Learn Python, Pandas, NumPy, Matplotlib and Machine Learning fundamentals with hands-on projects and real datasets.',
      topics: ['Python Basics', 'Pandas & NumPy', 'Data Visualization', 'Machine Learning', 'Scikit-learn', 'Projects'],
      image: '📊'
    },
    {
      id: 3,
      title: 'UI/UX Design Mastery',
      instructor: 'Sneha Kapoor',
      category: 'Design',
      duration: '8 Weeks',
      level: 'Beginner',
      rating: 4.9,
      students: 1980,
      price: 3999,
      description: 'From wireframes to high-fidelity prototypes — learn Figma, design systems, user research and modern UI principles.',
      topics: ['Design Thinking', 'Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'User Testing'],
      image: '🎨'
    },
    {
      id: 4,
      title: 'Cloud Computing with AWS',
      instructor: 'Karan Patel',
      category: 'Cloud',
      duration: '14 Weeks',
      level: 'Advanced',
      rating: 4.6,
      students: 1540,
      price: 7999,
      description: 'Get AWS certified! Learn EC2, S3, Lambda, RDS, IAM, CloudFormation and deploy real cloud-native applications.',
      topics: ['AWS Core Services', 'IAM & Security', 'Lambda', 'S3 & EC2', 'RDS', 'CloudFormation'],
      image: '☁️'
    },
    {
      id: 5,
      title: 'Android App Development',
      instructor: 'Pooja Nair',
      category: 'Mobile',
      duration: '10 Weeks',
      level: 'Intermediate',
      rating: 4.5,
      students: 2100,
      price: 4499,
      description: 'Build real Android apps using Kotlin, Jetpack Compose, MVVM architecture, Retrofit and Firebase integration.',
      topics: ['Kotlin', 'Jetpack Compose', 'MVVM', 'Retrofit', 'Firebase', 'Play Store Deployment'],
      image: '📱'
    },
    {
      id: 6,
      title: 'Cybersecurity Fundamentals',
      instructor: 'Vikram Singh',
      category: 'Security',
      duration: '9 Weeks',
      level: 'Beginner',
      rating: 4.7,
      students: 1760,
      price: 5999,
      description: 'Understand ethical hacking, network security, cryptography and how to defend systems from modern cyber threats.',
      topics: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Firewalls', 'Penetration Testing', 'SOC Basics'],
      image: '🔐'
    }
  ];

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  getCoursesByCategory(category: string): Course[] {
    return this.courses.filter(c => c.category === category);
  }
}