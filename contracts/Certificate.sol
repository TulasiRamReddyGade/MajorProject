// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Certificate {
    struct Cert {
        string candidate_id;
        string org_id;
        string course_name;
    }

    mapping(bytes32 => Cert) public certificates;

    function stringToBytes32(
        string memory source
    ) public pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            result := mload(add(source, 32))
        }
    }

    function generateCertificate(
        string memory _id,
        string memory _candidate_id,
        string memory _org_id,
        string memory _course_name
    ) public {
        bytes32 bytes_id = stringToBytes32(_id);
        certificates[bytes_id] = Cert(_candidate_id, _org_id, _course_name);
    }

    function getData(
        string memory _id
    ) public view returns (string memory, string memory, string memory) {
        bytes32 byte_id = stringToBytes32(_id);
        Cert memory temp = certificates[byte_id];
        return (temp.candidate_id, temp.org_id, temp.course_name);
    }
}
