import { Response } from 'express';
import { AuthenticatedRequest } from '../middlewares/auth';
import Group from '../models/group.model';


// Get all groups for the logged-in tenant
export const getAllGroups = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { tenantId } = req.user!;

    const groups = await Group.find({ tenantId }).select('_id name permissions createdAt updatedAt');

    res.status(200).json({
      count: groups.length,
      groups
    });
  } catch (error: any) {
    console.error('Error fetching groups:', error);
    res.status(500).json({
      message: 'Error fetching groups',
      error: error.message
    });
  }
};

