import React, { useState, useEffect } from "react";
import { category_offers } from "../Offer";

function Offers() {
  const [offers, setOffers] = useState(category_offers);
  console.log(offers);
  const [newOffer, setNewOffer] = useState({
    category: "",
    title: "",
    description: "",
    value: "",
    type: "",
  });

  //  Load offers from localStorage on mount
  useEffect(() => {
    const storedOffers = localStorage.getItem("offers");
    if (storedOffers) setOffers(JSON.parse(storedOffers));
  }, []);

  // Add new offer
  const handleAddOffer = () => {
    if (
      !newOffer.category ||
      !newOffer.title ||
      !newOffer.description ||
      !newOffer.discount
    ) {
      alert("Please fill in all fields");
      return;
    }

    const updatedOffers = [...offers, { id: Date.now(), ...newOffer }];
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
    console.log(updatedOffers);
    console.log(offers)

    // Reset form
    setNewOffer({
      category: "",
      title: "",
      description: "",
      type: "",
      discount: "",
    });
  };

  // Delete offer
  const handleDeleteOffer = (id) => {
    const updatedOffers = offers.filter((offer) => offer.id !== id);
    setOffers(updatedOffers);
    localStorage.setItem("offers", JSON.stringify(updatedOffers));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        Manage Offers
      </h1>

      {/* Offer Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddOffer();
        }}
        className="flex flex-col gap-3 w-full md:w-[400px] p-4 border rounded-md shadow-sm"
      >
        <input
          type="text"
          placeholder="Category"
          value={newOffer.category}
          onChange={(e) =>
            setNewOffer({ ...newOffer, category: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="Title"
          value={newOffer.title}
          onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          type="text"
          placeholder="type"
          value={newOffer.type}
          onChange={(e) => setNewOffer({ ...newOffer, type: e.target.value })}
          className="border p-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={newOffer.description}
          onChange={(e) =>
            setNewOffer({ ...newOffer, description: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Value"
          value={newOffer.value}
          onChange={(e) =>
            setNewOffer({ ...newOffer, value: e.target.value })
          }
          className="border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium p-2 rounded"
        >
          Add Offer
        </button>
      </form>

      {/* Offer List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Current Offers</h2>
        {offers.length === 0 ? (
          <p className="text-gray-500">No offers added yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="border p-4 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="text-lg font-bold text-gray-800">
                  {offer.title}
                </h3>
                <p className="text-gray-600 mt-1">{offer.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Category: {offer.category}
                </p>
               <p className="font-semibold text-green-700">
              {(() => {
                 if (offer.type === "percentage") {
                   return <span>Percentage Discount: {offer.value}%</span>;
                    } else {
                    return <span>Fixed Discount: ₹{offer.value}</span>;
              }
              })()}
            </p>


                <button
                  onClick={() => handleDeleteOffer(offer.id)}
                  className="mt-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Offers;
