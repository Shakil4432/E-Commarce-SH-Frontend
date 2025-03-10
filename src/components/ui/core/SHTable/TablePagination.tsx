import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../../button";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const TablePagination = ({ totalPage }: { totalPage: number }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathName = usePathname();

  console.log(currentPage);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      router.push(`${pathName}?page=${currentPage - 1}`);
    }
  };
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
      router.push(`${pathName}?page=${currentPage + 1}`);
    }
  };
  return (
    <div className="flex items-center mt-3 gap-3">
      <Button
        onClick={handlePrev}
        variant={"outline"}
        disabled={currentPage == 1}
      >
        <ArrowLeft></ArrowLeft>
      </Button>
      {[...Array(totalPage)].map((_, index) => (
        <Button
          onClick={() => {
            setCurrentPage(index + 1);
            router.push(`${pathName}?page=${index + 1}`);
          }}
          className="rounded-full"
          variant={`${currentPage === index + 1 ? "default" : "outline"}`}
          key={index}
        >
          {index + 1}
        </Button>
      ))}
      <Button
        disabled={currentPage == totalPage}
        onClick={handleNext}
        variant={"outline"}
      >
        <ArrowRight></ArrowRight>
      </Button>
    </div>
  );
};

export default TablePagination;
