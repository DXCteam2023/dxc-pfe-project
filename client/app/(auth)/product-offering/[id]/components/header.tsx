import Swal from "sweetalert2";
import { archiveProductOffering, publishProductOffering } from "../utils";

const handlePublishProductOfferin = (id: string) => {
  Swal.fire({
    title: "Are you sure?",
    html: "You are about to publish a new product offering. <br /><em style='color: rgb(225, 20, 45); font-size: .9rem; font-weight: medium;'>No changes are allowed once the product offering is published</em>",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#5f249f",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      publishProductOffering(id);
    }
  });
};

const handleArchiveProductOffering = (id: string) => {
  Swal.fire({
    title: "Are you sure?",
    html: "You are about to archive a published product offering.",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#5f249f",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.isConfirmed) {
      archiveProductOffering(id);
    }
  });
};

export default function ProductOfferingHeader({
  productOffering,
}: {
  productOffering: { name: string; status: string; externalId: string };
}) {
  return (
    <header className="py-5 flex items-center justify-between px-3">
      <div className="infos flex justify-between items-center">
        <div className="title font-medium text-lg me-3">
          {productOffering?.name}
        </div>
        <span
          className={
            " capitalize px-3 rounded-2xl text-white " +
            (productOffering?.status === "published"
              ? "bg-green-500"
              : productOffering?.status === "draft"
              ? "bg-orange-400"
              : productOffering?.status === "archived"
              ? "bg-purple-400"
              : "")
          }
        >
          {productOffering?.status}
        </span>
      </div>
      <div className="action-buttons flex gap-4">
        {productOffering?.status !== "published" ? (
          <button
            className="bg-green-400 py-1 px-3 rounded-md font-medium hover:bg-green-500 shadow-sm hover:shadow-md duration-300"
            onClick={() =>
              handlePublishProductOfferin(productOffering.externalId)
            }
          >
            Publish
          </button>
        ) : (
          <button
            className="bg-orange-300 py-1 px-3 rounded-md font-medium hover:bg-orange-400 shadow-sm hover:shadow-md duration-300"
            onClick={() =>
              handleArchiveProductOffering(productOffering.externalId)
            }
          >
            Archive
          </button>
        )}
      </div>
    </header>
  );
}
