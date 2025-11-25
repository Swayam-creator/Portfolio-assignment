export async function GET() {
  const projects = [
    {
      id: 1,
      title: "Devumble",
      description:
        "A community platform for developers to share knowledge, collaborate on projects, and build their developer network.",
      tech: ["React", "JavaScript", "Vite", "Tailwind CSS"],
      link: "https://github.com/Swayam-creator/Devumble-client",
      github: "https://github.com/Swayam-creator/Devumble-client",
      image: "/developer-community-platform.jpg",
    },
    {
      id: 2,
      title: "VendorConnect",
      description:
        "A street food vendor marketplace enabling verified suppliers and vendors to connect, negotiate bulk prices, and process secure payments through group buying.",
      tech: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Razorpay"],
      link: "https://vendor-connect-phi.vercel.app/",
      github: "https://github.com/Swayam-creator/VendorConnect",
      image: "/vendor-marketplace-platform.jpg",
    },
  ]

  return Response.json(projects)
}
