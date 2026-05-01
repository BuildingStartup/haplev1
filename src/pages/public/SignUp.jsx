import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import SignUpForm from "../../features/authentication/SignUpForm";
import useCategories from "../../features/categories/useCategories";
import SplashScreen from "../../ui/SplashScreen";

export default function SignUp() {
  const { categories, getAllCategories, loading:categoryLoading } = useCategories()

  useEffect(() => {
    getAllCategories();
  }, []);

  if(categoryLoading) return <SplashScreen />
  
  return (
    <AuthLayout>
      <main className="flex items-center justify-center">
      <section className="bg-white py-4 lg:py-8 px-4 lg:px-12 space-y-3 lg:space-y-5.5 lg:w-200">      
        <div className="space-y-1 lg:space-y-3">
          <h2 className="font-semibold text-xl lg:text-2xl">
            Start Selling Your <br/>Student Talent
          </h2>
          <p className="text-neutral-100 lg:text-sm">
            Join the trusted community of student-run businesses on campus.
            Create your <br/>seller account to get started.
          </p>
        </div>

        <SignUpForm categories={categories} />

        <p className="text-center text-neutral-100 mb-3">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium">
            Sign in
          </Link>
        </p>
    </section>
      </main>
    </AuthLayout>
  );
}
