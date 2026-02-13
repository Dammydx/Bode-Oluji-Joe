import React from "react";
import { motion } from "framer-motion";
import InviteForm from "../components/invite/InviteForm";

const Invite: React.FC = () => {
  return (
    <div className="pt-20 pb-20 bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl sm:text-5xl font-bold text-black">
              Request an Invite
            </h1>
            <p className="mt-4 text-xl text-gray-700 max-w-2xl mx-auto">
              For executive speaking engagements, leadership sessions, invitations.
              Provide the details below for scheduling and preparation.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Card */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="border rounded-2xl shadow-sm p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-black mb-2">Invite Details</h2>
            <p className="text-gray-600 mb-6">
              Short and accurate details help us respond faster.
            </p>

            <InviteForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Invite;
